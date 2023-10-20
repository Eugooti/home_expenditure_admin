// eslint-disable-next-line react/prop-types
const Header = ({Title,Subtitle}) => {
    return (
        <header className="text-center py-2">
            <h1 className="text-4xl font-bold text-gray-700">{Title}</h1>
            <p className="text-lg text-gray-600">{Subtitle}</p>
        </header>
    );
};

export default Header;
