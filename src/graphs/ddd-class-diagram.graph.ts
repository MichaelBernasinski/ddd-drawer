/**
 * **class-diagram**
 *
 * Markdown Class Diagram with [mermaidjs](https://github.com/mermaid-js/mermaid)
 *
 * ## Example
 *
 * ```mermaid
 *  classDiagram
 * 	namespace io-dragee-rules-relation {
 * 		class DrageeOne {
 * 			<<ddd/aggregate>>
 * 		}
 * 		class DrageeTwo {
 * 			<<ddd/entity>>
 * 		}
 * 	}
 * 	DrageeOne --> DrageeTwo : field, constructor, method_param
 * 	DrageeOne --> DrageeThree : constructor, method_param
 *
 * 	namespace io-dragee-rules-anotherPackage {
 * 		class DrageeThree {
 * 			<<ddd/value_object>>
 * 		}
 * 	}
 * ```
 * <br/>
 * <img src="../../assets/ddd-class-diagram.png" alt="DDD Class Diagram">
 *
 * @module Class Diagram
 */
import type { Dependency, Dragee } from '@dragee-io/type/common';

const drawHandlerClassDiagram = (dragees: Dragee[]) => {
    if (!dragees?.length) return '';
    const namespaceClassMap = Map.groupBy(dragees, d => extractPackageName(d.name));
    return `\`\`\`mermaid\n\tclassDiagram\n${drawNamespacesDragee(namespaceClassMap)}\`\`\``;
};

const drawNamespacesDragee = (namespaceClassMap: Map<string, Dragee[]>): string => {
    let namespaces = '';
    for (const [namespace, dragees] of namespaceClassMap.entries()) {
        namespaces += drawNamespaceDragee(dragees, namespace);
    }
    return namespaces;
};

const drawNamespaceDragee = (dragees: Dragee[], namespace: string): string => {
    return `\tnamespace ${namespace.replaceAll('.', '-')} {${dragees.map(drawClassDragee).join('')}\t}\n${dragees.map(drawDependenciesDragee).join('')}\n`;
};

const drawClassDragee = (dragee: Dragee): string => {
    return `\n\t\tclass ${extractClassName(dragee.name)} {\n\t\t\t<<${dragee.profile}>>\n\t\t}\n`;
};

const drawDependenciesDragee = (dragee: Dragee): string => {
    return `${Object.entries(dragee.depends_on)
        .map(dependancy => drawDependencyDragee(extractClassName(dragee.name), dependancy))
        .join('')}`;
};

const drawDependencyDragee = (drageeName: string, dependancy: [string, Dependency]): string => {
    return `\t${drageeName} --> ${extractClassName(dependancy[0])} : ${drawDependencyTypeDragee(dependancy[1])}\n`;
};

const drawDependencyTypeDragee = (dependancy: Dependency): string => {
    return `${Object.values(dependancy).join(', ')}`;
};

const extractClassName = (drageeName: string): string => {
    return drageeName.split('.').pop() ?? '';
};

const extractPackageName = (drageeName: string): string => {
    const drageeNameSplit = drageeName.split('.');
    drageeNameSplit.pop();
    return drageeNameSplit.join('.');
};

export default {
    label: 'Class Diagram',
    handler: drawHandlerClassDiagram
};
