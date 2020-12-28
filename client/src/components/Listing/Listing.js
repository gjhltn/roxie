/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react"
import styled, {keyframes} from 'styled-components';
import Modal from 'react-modal';
import GlobalStyle from '../GlobalStyle/GlobalStyle'
import Editor, {BookForm, ChapterForm, JournalForm} from '../Editor/Editor'


Modal.setAppElement('#root')

const Fullscreen = styled.div`
	display: flex;
	overflow: hidden;
	height: 100vh;
	wheight: -webkit-fill-available;
	flex-direction: column;
	padding: 0;
	background: #aec;
	margin: 0;
	position: absolute;
	bottom: 0;
	left:0;
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
const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)"
    },
    content: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "0"
  }
};


function Listing(){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

    return (
      <GlobalStyle>
        <button onClick={openModal}>Open Modal</button>
		<Junk />
		<button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
				<Editor
					closeModalCallback={closeModal}
					formComponent={BookForm}
				/>
        </Modal>
	  </GlobalStyle>
    );
}


const Junk = () =>
	<>				<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
				</p>		<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
				</p>	<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
				</p>		<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
				</p>			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
				</p><p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
				</p>
		<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu.
		</p>
	</>

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

Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu. Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus. Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et erat fringilla, scelerisque risus nec, sodales lectus. Fusce aliquet neque id pulvinar venenatis. Donec at sodales ex, interdum dictum dui. Nam a quam dapibus, ornare magna vitae, volutpat mi. Mauris dignissim pharetra luctus. Cras augue eros, elementum eget dictum a, lacinia sodales turpis. Sed id justo arcu. Aliquam porta fermentum lorem eu viverra. Vestibulum quis massa venenatis, feugiat lacus sit amet, dapibus urna. Donec tempor ultrices diam rutrum lobortis. Pellentesque suscipit lectus massa, ac malesuada lorem cursus a. Aenean magna risus, feugiat vel ullamcorper nec, sollicitudin a quam. Fusce augue nisi, suscipit tempor iaculis et, sagittis imperdiet purus. Morbi eget quam et sem interdum facilisis vel in diam. Sed nisi ex, elementum vitae lorem hendrerit, sollicitudin viverra lacus. Curabitur eros odio, commodo quis ipsum sit amet, rutrum lobortis quam. Suspendisse in odio finibus, facilisis purus vel, porttitor leo. Proin pharetra lacus ligula, ut egestas nunc aliquet sed. Integer iaculis pretium augue, in suscipit urna semper mollis. Suspendisse eu blandit lacus, congue feugiat erat. Curabitur tempus ac augue in fermentum. Donec id dui eros. Vestibulum sed leo scelerisque, tincidunt sem sed, ultrices ante. Proin augue lorem, accumsan id viverra laoreet, rhoncus sed lacus. Mauris eget felis blandit, pellentesque felis in, placerat eros. Cras metus purus, blandit sed est vitae, commodo malesuada arcu. Proin dapibus aliquet hendrerit. Nullam a viverra leo.

<textarea cols="100" rows="10"></textarea>
	</div>

	export default Listing