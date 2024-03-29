import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './User.css'

import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

export default function Login({ history, location }) {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const alert = useAlert()
	const dispatch = useDispatch()

	const { isAuthenticated, error, loading } = useSelector(state => state.auth)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {

		if (isAuthenticated) {
			history.push(redirect)
		}

		if (error) {
			alert.error(error)
			dispatch(clearErrors())
		}

	}, [dispatch, alert, isAuthenticated, error, history, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<>
			{loading ? <Loader /> : (
				<>
					<MetaData title={'Login'} />

					<div className="row wrapper">
						<div className="col-10 col-lg-5">
							<form className="shadow-lg rounded" onSubmit={submitHandler}>
								<h1 className="mb-3">Login</h1>

								<div className="form-group mb-3">
									<label className="form-label" htmlFor="email_field">Email</label>
									<input type="email" id="email_field" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
  
								<div className="form-group mb-3">
									<label className="form-label" htmlFor="password_field">Password</label>
									<input type="password" id="password_field" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>

								<Link to="/password/forgot" className="float-end">Forgot Password?</Link>
								<div className="clearfix"></div>

								<div className='d-grid gap-2'>
									<button id="login_button" type="submit" className="btn py-3">LOGIN</button>
								</div>
								<Link to="/register" className="float-end mt-3">New User?</Link>
								<div className="clearfix"></div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	)
}
