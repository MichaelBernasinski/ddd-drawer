import { describe, expect, test } from "bun:test";
import type { Dragee } from "@dragee-io/type/common";
import dddClassDiagram from "..";

const graphId = 'ddd/class-diagram';
const classDiagramGraph = dddClassDiagram.graphs.filter(graph => graph.id === graphId)[0];

describe('Should display correct DDD class diagram', () => {
    test('with no dragees', async () => {
        const dragees: Dragee[] = [];
        const graphResult = classDiagramGraph.handler(dragees);
        
        expect(graphResult).toBeEmpty();  
    })

    test('with dragees', async () => {
        const drageeOne: Dragee = await Bun.file("./test/sample/drageeOne.json").json();
        const drageeTwo: Dragee = await Bun.file("./test/sample/drageeTwo.json").json();
        const drageeThree: Dragee = await Bun.file("./test/sample/drageeThree.json").json();
        const dragees: Dragee[] = [drageeOne, drageeTwo, drageeThree];

        const graphResult = classDiagramGraph.handler(dragees);

        const testExpectedResult = await Bun.file("./test/expected/testExpectedResult.md").text();
        expect(graphResult).not.toBeEmpty();
        expect(graphResult).toBe(testExpectedResult);
    })
})
