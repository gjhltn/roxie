import React from "react"
import * as Yup from 'yup';
import styled from 'styled-components';
import { Formik, Form, FieldArray, useField} from 'formik';

const Fullscreen = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
	height: -webkit-fill-available;
	flex-direction: column;
	padding: 0;
	background: #aec;
	margin: 0;
`

const Header = styled.header`
	flex: 0 0 3rem;
	background: red;
`
const Main = styled.main`
flex:1;
background: pink;
overflow-y: scroll;
`





/* -- STYLED COMPONENTS ---------------------------------------------*/

const Button = styled.button`
	appearance: none;
	background: ${props => props.red ? "red" : "transparent"};
	border-radius: 2rem;
	border: 0;
	box-shadow:0 0 0 2px #ffff inset;
	color: white;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	height: ${props => props.red ? "1.5rem" : "3rem"};
	letter-spacing: inherit;
	line-height: ${props => props.red ? "1.5rem" : "2rem"};
	margin: 0;
	outline: 0;
	overflow: hidden;
	padding: 0 ${props => props.red ? "1.2rem" : "1rem"};
	vertical-align: top;
`

const Fieldset = styled.fieldset`
	display: block;
	border: 0;
	border-bottom: 2px solid rgba(0,0,0,0.2);
	padding: 0.5rem 2rem;
	
	&:last-child {
		border-bottom: 0;
		padding-top: 4rem;
	}
`

const Columns = styled.div`
	display: flex;
`
const Column = styled.div`
	flex: ${props => props.size ? `0 0 ${props.size}` : 1};
	&:not(:first-child){
		margin-left: 1rem;
	}
`

const TextInputInner = styled.div`
	margin-bottom: 1rem;
	
	label {
		display: block;
	}
	
	input, textarea {
		font-size: inherit;
		width: 100%;
		border-radius: 0;
		border: 2px solid ${props => props.error ? "red" : "transparent"};
				background:  ${props => props.error ? "pink" : "white"};
	}
	
	.error {
		color: pink;
		font-weight: 800;
	}
`

/* -- UTILITY FUNCTIONS ---------------------------------------------*/

const pruneBlank = (cull,o) => {
	cull.forEach(arrName=>{
		var keep = []
		if (o[arrName]){
			keep = o[arrName].filter(
				name => 
					(name.first && name.first.trim().length >0 ) || (name.last && name.last.trim().length>0 )
			)
		}
		if (keep.length > 0) {
			o[arrName] = keep
		} else {
			delete o[arrName]
		}
	})
	return(o)
}

/* -- FORM WIDGETS --------------------------------------------------*/

const NameListInput = ({
	arrayHelpers,
	arrayName,
	vals
}) =>
	<div>
		{vals.map((friend, index) => (
			<Columns key={index}>
				<Column>
					<MyTextInput label="First" name={`${arrayName}[${index}].first`} />
				</Column>
				<Column>
					<MyTextInput label="Last" name={`${arrayName}[${index}].last`} />
				</Column>
				<Column size="1rem">
					<Button type="button" red onClick={() => arrayHelpers.remove(index)}>-</Button>
				</Column>
			</Columns>
         ))}
         <Button
           type="button"
          onClick={() => arrayHelpers.push({ last: '', first: '' })}
         >
           +
         </Button>
	</div>

const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextInputInner error={meta.touched && meta.error}>
			{/*<label htmlFor={props.id || props.name}>{label}</label>*/}
			<textarea {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</TextInputInner>
	);
};

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextInputInner error={meta.touched && meta.error}>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</TextInputInner>
	);
};
	
/* -- FORM FRAGMEMTS ------------------------------------------------*/

const Title = ({ values }) =>
<Fieldset>
	<h3>Title</h3>
	<MyTextArea
		label="Title"
		name="title"
		type="textArea"
		rows="4"
		placeholder="Fear and Trembling"
	/>
</Fieldset>

const Authorship = ({ values }) =>
<Fieldset>
	<h3>Authorship</h3>
	<FieldArray
		name="authors"
		render= {arrayHelpers =>
			<NameListInput
				arrayName="authors"
				arrayHelpers={arrayHelpers}
				vals={values.authors} />}/>
	<h3>Editor</h3>
	<FieldArray
		name="editors"
		render={arrayHelpers =>
			<NameListInput
				arrayName="editors" 
				arrayHelpers={arrayHelpers} 
				vals={values.editors} />}/>
	<h3>Translator</h3>
	<FieldArray
		name="translators"
		render={arrayHelpers =>
		<NameListInput
				arrayName="translators" 
				arrayHelpers={arrayHelpers} 
				vals={values.translators} />}/>
</Fieldset>

const Imprint = ({ values }) =>
<Fieldset>
	<h2>Imprint</h2>
	<MyTextInput
		label="Publisher"
		name="imprint.publisher"
		type="text"
		placeholder="Birmigham University Press"
	/>
	<Columns>
		<Column>
			 <MyTextInput
			 	label="Place"
				name="imprint.place"
				type="text"
				placeholder="Birmigham "
			 />
		</Column>
		<Column>
			<MyTextInput
				label="Year"
				name="imprint.year"
				type="text"
				placeholder="2021"
			/>
		</Column>
	</Columns>
</Fieldset>

const Submit = () => <Button type="submit">Submit</Button>


/* -- WHOLE FORMS ---------------------------------------------------*/

export const JournalForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: ""
	}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}
			
			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned.type="journal"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
		{({ values }) => (
				<Form>
					<Title values={values} />
					<Submit/>
				</Form>
				)}
		</Formik>
	)
}

export const ChapterForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: ""
	}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}
			
			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned.type="chapter"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
		{({ values }) => (
				<Form>
					<Title values={values} />
					<Submit/>
				</Form>
				)}
		</Formik>
	)
}

export const BookForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: "",
		authors: [
			{
				last:'',
				first:''
			}
		],
		editors: [],
		translators: [],
		imprint: {
			publisher: '',
			place: '',
			year: '',
		},
	}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={
				Yup.object({
					title: Yup.string().required('Required'),
					imprint: Yup.object().shape({
						year: Yup.string()
							.required('Required'),
						publisher: Yup.string()
							.required('Required'),
						place: Yup.string()
							.required('Required'),
				}),
			})}
			
			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned = pruneBlank(['authors','editors','translators'], pruned)
					pruned.type="book"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
			{
				({	values }) => (
					<Fullscreen>
						<Main>						<Title values={values} />
						<Authorship values={values} />
						<Imprint values={values}/></Main>
						<Header><Submit/></Header>
					</Fullscreen>
				
				)
			}
		</Formik>
	)
}

/* -- EXPORTED COMPONENT ---------------------------------------------*/

const Editor = ({
	item,
	action,
	descriptor,
	formComponent,
	closeModalCallback
}) => {
	const C = formComponent
	return (
		<C
			closeModalCallback={closeModalCallback}
			action={action}
			key={(item && item.id) ? item.id : "new"}
			item={item} />
		)
}

export default Editor

const Big = () =>
	<div>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.

Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus.

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

<textarea rows="10"></textarea>
</div>