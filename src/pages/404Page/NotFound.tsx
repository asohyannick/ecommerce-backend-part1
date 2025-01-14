import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div>
      <h1>Oops Page not found</h1>
      <h2>Here are some helpful links for you.</h2>
      <Link to='/'>Home</Link>
      <Link to='/pages/contact'>Contact Page</Link>
      <Link to='/components/blog'>Blog Page</Link>
    </div>
  );
}

export default NotFound;

