import React, { useState, useEffect } from 'react'
import './User.css'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'

export default function NewPassword({ history, match }) {

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const alert = useAlert()
	const dispatch = useDispatch()

	const { error, success } = useSelector(state => state.forgotPassword)

	useEffect(() => {

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (success) {
			alert.success('Password updated successfully')
			history.push('/login')
		}

	}, [dispatch, alert, error, success, history])

	const submitHandler = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.set('password', password)
		formData.set('confirmPassword', confirmPassword)

		dispatch(resetPassword(match.params.token, formData))
	}

	return (
		<>
			<MetaData title={'New Password Reset'} />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h1 className="mb-3">New Password</h1>

						<div className="mb-3">
							<label htmlFor="password_field"  className='form-label'>Password</label>
							<input
								type="password"
								id="password_field"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="confirm_password_field"  className='form-label'>Confirm Password</label>
							<input
								type="password"
								id="confirm_password_field"
								className="form-control"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						<div class="d-grid gap-2">
							<button
								id="new_password_button"
								type="submit"
								className="btn btn-block py-3">
								Set Password
							</button>
						</div>

					</form>
				</div>
      </div>
		</>
	)
}
