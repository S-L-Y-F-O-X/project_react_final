import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {searchActions} from "../../redux";

interface IProps {
    onSearch: (query: string) => void;
}

const SearchComponent: FC<IProps> = ({onSearch}) => {
    const [searchQuery, setSearchQueryState] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(searchQuery);
        dispatch(searchActions.setSearchQuery(searchQuery));
        dispatch(searchActions.fetchSearchResults(searchQuery));
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQueryState(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export {SearchComponent};
