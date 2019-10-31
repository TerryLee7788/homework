import axios from 'axios';

const Service = {
    /* API doc:
     *   https://developer.github.com/v3/search/#search-repositories
     */
    searchRepositories: (params) => (axios.get('https://api.github.com/search/repositories', { params }))
};

export default Service;
