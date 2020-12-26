import React from "react"
import  { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</>
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
   <h1>Subscribe!</h1>
      <Formik
       initialValues={{
         firstName: '',
         lastName: '',
         email: '',
        acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
       }}
      validationSchema={Yup.object({
          firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string()
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
             .required('Required'),
         })}
         onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
             alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>           <MyTextInput
            label="First Name"
            name="firstName"
             type="text"
             placeholder="Jane"
           />
           <MyTextInput
             label="Last Name"
             name="lastName"
             type="text"
             placeholder="Doe"
           />
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
<option value="product">Product Manager</option>
             <option value="other">Other</option>
           </MySelect>
           <MyCheckbox name="acceptedTerms">
             I accept the terms and conditions
           </MyCheckbox>
 
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
		<SignupForm/>
	
	{item && <div>
		{JSON.stringify(item)}
		<div>
			<SignupForm/>
			{/*<button onClick={e=>saveHandler(item)}>save</button>*/}
		</div></div>}
	</div>




export default Editor