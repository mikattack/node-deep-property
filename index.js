
/* 
 * Detects whether a given object has a specified nested property.
 * 
 * Normal checks for deeply nested properties will throw an
 * exception if an intermediate property doesn't exist.  This
 * function will validate the property path without throwing
 * exceptions.
 * 
 * Arguments:
 * 
 *     obj      Object to check properties for.
 * 
 *     path     [string] Dot-separated path specifier to nested
 *              property.  Example: "contact.name.first"
 * 
 * Returns:     [boolean] TRUE if property is defined at the
 *              given path, otherwise FALSE.  If a non-string
 *              is passed as `path`, FALSE is returned.
 */
module.exports = function (obj, path, ownProperty) {
  if (typeof path !== 'string') {
    return false;
  }
  var tokens = path.split('.');
  for (var i = 0, len = tokens.length; i < len; i++) {
    if (! obj || ! obj.hasOwnProperty(tokens[i]))
    {
      return false;
    } else {
      obj = obj[tokens[i]];
    }
  }
  return true;
};
