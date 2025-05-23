
const AuthorPage = ({params}) => {
    const {name}=params;

    return (
        <div>
           {name} 
        </div>
    );
};

export default AuthorPage;