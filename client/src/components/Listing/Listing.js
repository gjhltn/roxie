import React from "react"
import styled from 'styled-components';

import GlobalStyle from '../GlobalStyle/GlobalStyle'
import ItemList from '../ItemList/ItemList'
import Editor from '../Editor/Editor'
import Splash from '../Splash/Splash'

import {names} from '../../lib/chicago'

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
	height: -webkit-fill-available;
	flex-direction: column;
`

const Header = styled.header`
	flex: 0 0 4rem;
	background: rgba(0,0,0,0.5);
`

const Main = styled.main`
	flex:1;
	overflow-y: scroll;
	padding: 0 2rem 10rem;
`

const Section = styled.section`

`

const ItemWrapper = styled.div`
	display: flex;
	margin-top: 1rem;
	padding-bottom: 1rem;
	&:not(:last-child) {
		border-bottom: 1px solid rgba(255,255,255,0.4);
	}
	.Title {
		font-style: italic;
	}
`

const Heading = styled.h2`
	text-transform: capitalize;
`

const AuthorWrapper = styled.div`
	margin-bottom: 2rem;
	.Author {
		border-bottom: 4px solid white;
		padding:0 0 1rem;
		font-weight:800;
	}
`
	
const Items = ({data}) => {
	return (
		<Kind name="book" allData={data} />
	)
}

const Item = ({data}) =>
	<ItemWrapper>
		<div className="Title">{data.title}</div>
	</ItemWrapper>

const Author = ({name,data}) =>
	<AuthorWrapper>
		<div className="Author">{name}</div>
		{
			data.map(d=><Item key={d.id} data={d}/>)
		}
	</AuthorWrapper>

const Kind = ({name, allData}) => {
	const data = allData.filter(datum=>datum.type===name)
	const grouped = groupBy(data, 
		datum => (datum.authors && datum.authors.length>0) ? names(datum.authors) : "[anonymous]"
	);
	const allNames = Array.from(grouped.keys()).sort()
	return (
		<Section>
			<Heading>{name}</Heading>
						{
				allNames.map(n => <Author key={n} name={n} data={grouped.get(n)}/>)
			}
		</Section>
	)
}

const Listing = ({
	items,
	loaded,
	createFn
}) => {
	const [selectedId, setSelectedId] = React.useState();
	return(
		<GlobalStyle>
			<Wrapper>
				{
					(!loaded) ?
						<Splash 
							status="loading"
						/>
					:
					<>
						<Wrapper>
							<Main>
							<Items data={items}/>
							</Main>
														<Header>
								toolbar
								</Header>
						</Wrapper>
					</>
				}
			</Wrapper>
	</GlobalStyle>
	)
}

export default Listing;
