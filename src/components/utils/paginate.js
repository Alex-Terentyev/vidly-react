import _ from 'lodash';

export default function paginate(items, pageNumber, pageSize){
    // let index = (currentPage - 1) * pageSize;
    // let pageArray = [...array].splice(index, pageSize);
    // return pageArray;

    let index = (pageNumber - 1) * pageSize;
    return _(items).slice(index).take(pageSize).value();
}