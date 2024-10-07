import { findGraphs } from "@dragee-io/type/grapher";

export default {
    namespace: 'ddd',
    graphs: findGraphs('ddd', `${import.meta.dir}/src/graphs/`)
}
