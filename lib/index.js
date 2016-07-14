import {maxSatisfying, validRange} from 'semver';

export default ({versions, 'dist-tags': distTags = {}}, rangeOrTag) => {
  const range = validRange(rangeOrTag);
  const version = range ?
    maxSatisfying(Object.keys(versions), range) :
    distTags[rangeOrTag];

  return versions[version];
};
