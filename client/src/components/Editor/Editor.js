import React from "react"
import * as Yup from 'yup';
import styled from 'styled-components';
import { Formik, Form, Field, FieldArray, useField } from 'formik';

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



export const FriendList = () => (
	<Formik
		initialValues={{
			title: "",
			authors: [
				{
					last:'Neckett',
					first:'Samuel'
				}
			],
			editors: [],
			translators: []
		}}
		
		onSubmit={values =>
			setTimeout(() => {
				var pruned = Object.assign({},values)
				pruned = pruneBlank(['authors','editors','translators'], pruned)
				alert(JSON.stringify(pruned, null, 2));
			}, 500)
		}
       
		render={({ values }) => (
			<Form>
			<Box>
			<h3>Title</h3>
				  	  	<MyTextArea
            label="Title"
            name="title"
             type="textArea"
			 rows="4"
             placeholder="Fear and Trembling"
			 />
			</Box>
			<Box>
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
				</Box>
				<Box>
					<h2>Imprint</h2>
			  	  	<MyTextInput
            label="Publisher"
            name="publication.publisher"
             type="text"
             placeholder="Birmigham University Press"
			 />
			 		<Columns>
					<Column>
			 			  	  	<MyTextInput
            label="Place"
            name="publication.place"
             type="text"
             placeholder="Birmigham "
			 />
			 </Column>
			 <Column>
						 			  	  	<MyTextInput
            label="Date"
            name="publication.date"
             type="text"
             placeholder="2021"
			 />
			</Column>
			</Columns>
				</Box>
				<Box><Button type="submit">Submit</Button></Box>
			</Form>
		)}
	/>
)

const Button = styled.button`
	appearance: none;
	background: none;
	border: 0;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	height: ${props => props.red ? "1.5rem" : "3rem"};
	letter-spacing: inherit;
	line-height: ${props => props.red ? "1.5rem" : "2rem"};
	margin-top: ${props => props.red ? "1.7rem" : "0"};
	margin-bottom: ${props => props.red ? "0" : "2rem"};
	outline: 0;
	overflow: hidden;
	padding: 0 ${props => props.red ? "1.2rem" : "1rem"};
	vertical-align: top;
	border-radius: 2rem;
	background: ${props => props.red ? "red" : "transparent"};
	box-shadow:0 0 0 2px #ffff inset;
	color: white;
`

const Box = styled.fieldset`
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
		border: 0;
		background: ${props => props.error ? "pink" : "white"};
	}
`

const MyTextArea = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// messfirst if the field is invalid and it has been touched (i.e. visited)
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
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// messfirst if the field is invalid and it has been touched (i.e. visited)
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

const MyCheckbox = ({ children, ...props }) => {
	// React treats radios and checkbox inputs differently other input types, select, and textarea.
	// Formik does this too! When you specify `type` to useField(), it will
	// return the correct bag of props for you
	const [field, meta] = useField({ ...props, type: 'checkbox' });
	return (
	<div>
		<label className="checkbox">
			<input type="checkbox" {...field} {...props} />
			{children}
		</label>
		{
			meta.touched && meta.error ? (
<div className="error">{meta.error}</div>
 ) : null}
    </div>
  );
 };

const MySelect = ({ label, ...props }) => {
 const [field, meta] = useField(props);
 return (
 <div>
     <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
       <div className="error">{meta.error}</div>
     ) : null}
    </div>
  )
};

// And now we can use these
const SignupForm = () => {
return (
   <>
      <Formik
       initialValues={{
		   title: "",
         firstName: '',
         lastName: '',
		 imprint: {
			 publisher: '',
			 place: '',
			 date: '',
		}
     //    email: '',
      //  acceptedTerms: false, // added for our checkbox
      //    jobType: '', // added for our select
       }}
	   validationSchema={
		  Yup.object({
			  title: Yup.string().required('Required'),
			/*  firstName: Yup.string()
			  	.max(15, 'Must be 15 characters or less')
				.required('Required'),
			lastName: Yup.string()
				.max(20, 'Must be 20 characters or less')
				.required('Required'),*/
	/*		email: Yup.string()
				.email('Invalid email address')
				.required('Required'),
			acceptedTerms: Yup.boolean()
				.required('Required')
				.oneOf([true], 'You must accept the terms and conditions.'),
				jobType: Yup.string()
					.oneOf(
						['designer', 'development', 'product', 'other'],
						'Invalid Job Type'
					)
					.required('Required'),*/
         })}
         onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
			  let pruned=pruneBlank(values);
             alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
	  <Form>
	  	  	<MyTextInput
            label="Title"
            name="title"
             type="text"
             placeholder="Fear and Trembling"
			 />
		<Columns>
			<Column>	  	<MyTextInput
            label="First Name"
            name="firstName"
             type="text"
             placeholder="Jane"
			 /></Column>
			<Column>           <MyTextInput
             label="Last Name"
             name="lastName"
             type="text"
             placeholder="Doe"
			 /></Column>
		</Columns>
		
		{/*
           <MyTextInput
             label="Email Address"
             name="email"
             type="email"
            placeholder="jane@formik.com"
           />
           <MySelect label="Job Type" name="jobType">
             <option value="">Select a job type</option>
             <option value="designer">Designer</option>
            <option value="development">Developer</option>
<option value="product">Product Manfirstr</option>
             <option value="other">Other</option>
           </MySelect>
           <MyCheckbox name="acceptedTerms">
             I accept the terms and conditions
           </MyCheckbox>*/}
 			<h2>Imprint</h2>
			  	  	<MyTextInput
            label="Publisher"
            name="publication.publisher"
             type="text"
             placeholder="Birmigham University Press"
			 />
			 		<Columns>
					<Column>
			 			  	  	<MyTextInput
            label="Place"
            name="publication.place"
             type="text"
             placeholder="Birmigham "
			 />
			 </Column>
			 <Column>
						 			  	  	<MyTextInput
            label="Date"
            name="publication.date"
             type="text"
             placeholder="2021"
			 />
			</Column>
			</Columns>
          <button type="submit">Submit</button>
         </Form>
       </Formik>
     </>
   );
 };
/*
const userData = {
  id: '1245234',
  email: 'jared@reason.nyc',
  pets: [
    {
      id: '3asdfasf',
      type: 'dog',
      name: 'Spot',
    },
    {
      id: 'asdfl123',
      type: 'cat',
      name: 'Felix',
    },
  ],
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  pets: Yup.array().of(
    Yup.object().shape(
      {
        name: Yup.number().required('Required'),
        type: Yup.number('Pet must be a number').required('Required'),
      },
      'Pet is invalid',
    ),
  ),
});

const formikEnhancer = Formik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    pets: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Pets must have a name'),
        type: Yup.string().required(),
      }),
    ),
  }),
  mapPropsToValues: props => ({
    email: props.user.email,
    pets: props.user.pets,
  }),
  handleSubmit: payload => {
    //console.log(reach(schema, 'pets.type'));
    schema
      .isValid(
        {
          email: 'jared@palmer.net',
          pets: [
            {
              type: 'thing',
              name: 'thing',
            },
          ],
        },
        { abortEarly: false },
      )
      .then(
        (something, other) => console.log(something, other),
        error => console.log(error),
      );
  },
  displayName: 'MyForm',
});

class CustomPetInput extends React.Component {
  addPetBelow = () => {
    console.log(this.props.values.pets.findIndex(p => p.id === this.props.id));
    const pets = this.props.values.pets;
    pets.splice(
      this.props.values.pets.findIndex(p => p.id === this.props.id) + 1,
      0,
      {
        id: uuid.v4(),
        name: '',
        type: 'dog',
      },
    );
    this.props.setValues({
      ...this.props.values,
      pets,
    });
  };

  removePet = () => {
    this.props.setValues({
      ...this.props.values,
      pets: this.props.values.pets.filter(pet => pet.id !== this.props.id),
    });
  };

  handleChange = e => {
    const newPets = this.props.values.pets;
    newPets.find(p => p.id === this.props.id)[e.target.name] = e.target.value;
    this.props.onChange('pets', newPets);
  };

  handleBlur = e => {
    const touchedPets = this.props.touched.pets;
    touchedPets.find(p => p.id === this.props.id)[e.target.name] = true;
    this.props.setTouched({
      ...this.props.touched,
      pets: touchedPets,
    });
  };

  render() {
    return (
      <div>
        <label htmlFor={this.props.id + '-type'}>Type</label>
        <select
          type="text"
          id={this.props.id + '-type'}
          name="type"
          value={this.props.type}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <label htmlFor={this.props.id + '-name'}>Name</label>
        <input
          type="text"
          id={this.props.id + '-name'}
          name="name"
          value={this.props.name}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <button type="button" onClick={this.removePet}>
          X
        </button>
        <button type="button" onClick={this.addPetBelow}>
          +
        </button>
      </div>
    );
  }
}

const MyForm = ({
  values,
  handleChange,
  handleBlur,
  handleChangeValue,
  handleSubmit,
  setValues,
  touched,
  errors,
}) =>
  console.log(errors) ||
  <form onSubmit={handleSubmit}>
    <label htmlFor="email" style={{ display: 'block' }}>
      Email
    </label>
    <input
      id="email"
      placeholder="Enter your email"
      type="text"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.email &&
      touched.email &&
      <div style={{ color: 'red' }}>
        {errors.email}
      </div>}
    <div style={{ marginTop: '1rem' }}>Pets</div>
    {values.pets.map(pet =>
      <CustomPetInput
        key={pet.id}
        values={values}
        errors={errors}
        touched={touched}
        {...pet}
        setValues={setValues}
        onChange={handleChangeValue}
      />,
    )}
    <button type="submit" style={{ display: 'block', marginTop: '1rem' }}>
      Submit
    </button>
  </form>;
  */

//const MyEnhancedForm = formikEnhancer(MyForm);

const Editor = ({item,saveHandler}) =>
	<div>
		<FriendList/>
	
	{item && <div>
		{JSON.stringify(item)}
		<div>
			<FriendList/>
			{/*<button onClick={e=>saveHandler(item)}>save</button>*/}
		</div></div>}
	</div>




export default Editor