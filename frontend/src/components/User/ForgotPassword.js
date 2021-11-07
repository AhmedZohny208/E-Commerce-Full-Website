import React, { useState, useEffect } from 'react'
import './User.css'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

export default function ForgotPassword() {

	const [email, setEmail] = useState('')

	const alert = useAlert()
	const dispatch = useDispatch()

	const { message, error, loading } = useSelector(state => state.forgotPassword)

	useEffect(() => {

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (message) {
			alert.success(message)
		}

	}, [dispatch, alert, error, message])

	const submitHandler = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.set('email', email)

		dispatch(forgotPassword(formData))
	}

	return (
		<>
			<MetaData title={'Forgot Password'} />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h1 className="mb-3">Forgot Password</h1>
						<div className="mb-3">
							<label htmlFor="email_field" className='form-label'>Enter Email</label>
							<input
								type="email"
								id="email_field"
								className="form-control"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div class="d-grid gap-2">
							<button
								id="forgot_password_button"
								type="submit"
								className="btn btn-block py-3"
								disabled={loading ? true : false}>
								Send Email
							</button>
						</div>

					</form>
				</div>
      </div>
		</>
	)
}
