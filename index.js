/**
 * Given a collection (object or array of objects) and a path, it dives into the object tree trying to find
 * the leaf key, iterating over any array of object it finds calling the transformer function
 * this function mutates the original object and returns it
 * @param {object|object[]} collection
 * @param {function} transformer function (item) will transform the object in place and must return it
 * @param {string} path
 * @param {*} context transformer will be called to this context
 * @returns {*} the value that results from the reduction or undefined if the path is not found
 */
 function deepTransform(collection, transformer, path, context = null) {

    function _deepTransform(obj, pathArr) {
        if (Array.isArray(obj)) {
            return obj.map((item) => _deepTransform(item, [...pathArr]));
        }
        if (!pathArr.length) {
            // Arrived at the leaf path
            return transformer.call(context, obj);
        }
        const key = pathArr.pop();
        
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            // throw new Error(`Path ${path} not found in object.`);
            // NOTE: maybe throw an error or an option to do something when path is not found
            return obj;
        }

        obj[key] = _deepTransform(obj[key], pathArr);
        return obj;
    }

    return _deepTransform(collection, path.split('.').reverse());
}

module.exports = deepTransform;
