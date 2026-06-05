import lodash from 'lodash';

export const getFields = ({object, fields}) => {
    if (!object || !fields) return null;    
    return lodash.pick(object, fields);
}