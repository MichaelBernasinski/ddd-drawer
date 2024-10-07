```mermaid
	classDiagram
	namespace io-dragee-rules-relation {
		class DrageeOne {
			<<ddd/aggregate>>
		}

		class DrageeTwo {
			<<ddd/entity>>
		}
	}
	DrageeOne --> DrageeTwo : field, constructor, method_param
	DrageeOne --> DrageeThree : constructor, method_param

	namespace io-dragee-rules-anotherPackage {
		class DrageeThree {
			<<ddd/value_object>>
		}
	}

```