import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getWelcomeMessage } from "../actions/home";

function Home() {
  const { user: currentUser } = useSelector((state) => state.auth)
  const { content } = useSelector((state) => state.home)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentUser) { 
      navigate('/login')
      window.location.reload();
    }
    else {
      dispatch(getWelcomeMessage())
    }
  }, [currentUser, navigate, dispatch])


  return (
    // <div>Welcom to the application</div>
    <div className="alert alert-success" role="alert">
      <h3>{content}</h3>
    </div>
  )
}

export default Home;