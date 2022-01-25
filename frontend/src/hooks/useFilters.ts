/**
 * @param {array} items
 * @param {object} filters
 * @summary Filters an array of items depending on it's values
*/
export function useFilters(items: any[], filters: any, search: string): any {
    const res: any[] = items.filter(item => {
        return Object.keys(filters).every(filter => {
            if(filters[filter] === 'all')
                return item;
            if(item[filter] === filters[filter]) {
                return item;
            }

        })
    }).filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
}