function SearchResult({
    icon,
    title,
    subtitle,
    onClick,
}){

    return(

        <button
            className="search-result"
            onClick={onClick}
        >

            {icon}

            <div>

                <strong>{title}</strong>

                {subtitle&&(
                    <span>{subtitle}</span>
                )}

            </div>

        </button>

    );

}

export default SearchResult;