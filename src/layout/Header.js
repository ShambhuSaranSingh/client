// import HeaderCSS from './Header.css';
function Header() {
    return (
        <header className="bg-blue-500 text-red p-1">
            <nav class="navbar navbar-light bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand  text-white">MyApp</a>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>
    )
}
export default Header;