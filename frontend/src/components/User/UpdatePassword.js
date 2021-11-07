import React, { useState, useEffect } from 'react'
import './User.css'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

export default function UpdatePassword({ history }) {

	const [oldPassword, setOldPassword] = useState('')
	const [password, setPassword] = useState('')

	const alert = useAlert()
	const dispatch = useDispatch()

	const { error, isUpdated, loading } = useSelector(state => state.user)

	useEffect(() => {

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

		if (isUpdated) {
			alert.success('Password updated successfully')

			history.push('/me')

			dispatch({
				type: UPDATE_PASSWORD_RESET
			})
		}

	}, [dispatch, alert, error, history, isUpdated])

	const submitHandler = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.set('oldPassword', oldPassword)
		formData.set('password', password)

		dispatch(updatePassword(formData))
	}

	return (
		<>
			<MetaData title={'Update Password'} />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h1 className="mt-2 mb-5">Update Password</h1>
						<div className="mb-3">
							<label for="old_password_field" className='form-label'>Old Password</label>
							<input
								type="password"
								id="old_password_field"
								className="form-control"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
						</div>

						<div className="mb-3">
							<label for="new_password_field" className='form-label'>New Password</label>
							<input
								type="password"
								id="new_password_field"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div class="d-grid gap-2">
							<button type="submit" className="btn update-btn btn-block mt-4 mb-3 py-3" disabled={loading ? true : false}>Update Password</button>
						</div>
					</form>
				</div>
      </div>
		</>
	)
}
