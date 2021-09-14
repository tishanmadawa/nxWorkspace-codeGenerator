import { Tree, formatFiles, installPackagesTask, generateFiles, readProjectConfiguration, joinPathFragments,ChangeType } from '@nrwl/devkit';
import { runCommandsGenerator } from '@nrwl/workspace/generators';
import {libraryGenerator} from "@nrwl/react/index"
import { Linter } from '@nrwl/linter';


export default async function (tree: Tree, schema: any) {
  await generateFiles(tree,joinPathFragments(__dirname,"./init"),joinPathFragments("./libs/fields",schema.name),{});
  await formatFiles(tree);

  await libraryGenerator(tree,{name:schema.name,style:"styled-components",skipTsConfig:false,skipFormat:false,unitTestRunner:"jest",linter:Linter.EsLint,directory:"fields"});
  await generateFiles(tree,joinPathFragments(__dirname,"./lib"),joinPathFragments("./libs/fields",schema.name,"src"),{name:schema.name,sd:"ts"});

  var importString = "";
  var dragString = "";
  var switchString = "";
  var child = tree.children("./libs/fields");
  for(var index=0;index<child.length;index++){
    importString += "import { Field as "+child[index].replace("-","").charAt(0).toUpperCase() + child[index].replace("-","").slice(1)+" } from \"@nx-vision/fields/"+child[index]+"\""+`;\n`;
    switchString += "case \""+child[index]+"\" : return <"+child[index].replace("-","").charAt(0).toUpperCase() + child[index].replace("-","").slice(1)+" onChange={(value:any) => { console.log(value); }} onDoubleClick={(e:any) => setSelectedFieldDetails({title:e.title,div:value.name,index:index})}  title={field.title}  /> \n break; \n";
    dragString += "<DragField field=\""+child[index]+"\">"+
            "<"+child[index].replace("-","").charAt(0).toUpperCase() + child[index].replace("-","").slice(1) +" onChange={(value:any) => {console.log(value);}} onDoubleClick={(e:any) =>{return null}} title={\""+child[index].replace("-","")+"\"}/></DragField>";
  }
  console.info(importString);
  await generateFiles(tree,joinPathFragments(__dirname,"./main"),joinPathFragments("./apps/draganddrop/src/app"),{exe:"tsx",importString:importString,dragField:dragString,switchString:switchString});

  await formatFiles(tree);

  await generateFiles(tree,joinPathFragments(__dirname,"./files"),joinPathFragments("./libs/fields",schema.name,"src/lib"),{name:schema.name,sd:"tsx"});
  return () => {
    installPackagesTask(tree);
  };
}
