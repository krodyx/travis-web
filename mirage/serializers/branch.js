import { Serializer } from 'ember-cli-mirage';

export default Serializer.extend({
  serialize(object, request) {
    if (object.attrs) {
      return this.serializeSingle(object, request);
    }
    return {
      '@type': 'branches',
      branches: object.models.map(branch => this.serializeSingle(branch, request)),
      pagination: {
        count: object.length
      }
    };
  },

  serializeSingle(branch, request) {
    let repositoryId = request.params.repo_id;
    let { name } = branch.attrs;

    let response = {
      '@type': 'branch',
      '@href': `/repo/${repositoryId}/branch/${name}`,
      '@representation': 'standard',
      name,
    };

    // const { builds } = branch;

    // if (builds && builds.models.length) {
    //   const lastBuild = builds.models[builds.models.length - 1];

    //   response.last_build = this.serializerFor('build').serializeEmbedded(lastBuild, request);
    // }

    return response;
  },
});
