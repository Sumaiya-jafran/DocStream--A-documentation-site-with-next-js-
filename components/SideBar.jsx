"use client";
import {
  getDocByAuthor,
  getDocByCategory,
  getDocByTag,
} from "@/utils/doc-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const SideBar = ({ docs }) => {
  const pathName = usePathname();
  const [roots, setRoots] = useState([]);
  const [childrenGrpByParent, setChildrenGrpByParent] = useState({});
  useEffect(() => {
    var matchedDocs = docs;
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocByTag(docs, tag);
      // console.log("this is tags path and tag is :",tag)
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocByCategory(docs, category);
    } else if (pathName.includes("/authors")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocByAuthor(docs, author);
    }
    const roots = matchedDocs.filter((doc) => doc.parent === null);
    const childrenOfRoot = matchedDocs.filter((doc) => doc.parent);

    const childrenGrpByParent = childrenOfRoot.reduce((acc, items) => {
      const key = items.parent ?? items.id;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(items);
      return acc;
    }, {});

    const childrenKeys = Reflect.ownKeys(childrenGrpByParent);
    childrenKeys.forEach((key) => {
      const foundInRoot = roots.find((root) => root.id === key);
      if (!foundInRoot) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    });
    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRoots([...roots]);
    setChildrenGrpByParent({ ...childrenGrpByParent });
  }, [pathName]);

  console.log("current path is:", pathName);
  // const docs = getDocument();

  // console.log("grp", childrenGrpByParent);
  return (
    //   <!-- sidebar nav -->
    <nav className="lg:mt-10 lg:block">
      <h2>I am sidebar from layout</h2>
      {/* {
        docs.map(doc=><h1 key={doc.id}>{doc.title}</h1>)
    
       } */}
      <ul role="list" className="border-l-6 px-4 border-red-500">
        {roots.map((rootNode) => (
          <li key={rootNode.id}>
            <Link area-current="page" href={`/docs/${rootNode.id}`}>
              <span className="truncate">{rootNode.title}</span>
            </Link>
            {childrenGrpByParent[rootNode.id] && (
              <ul role="list" className="border-l-4 pl-4 border-blue-500">
                {childrenGrpByParent[rootNode.id].map((subNode) => (
                  <li key={subNode.id}>
                    <Link
                      className="pl-6"
                      href={`/docs/${rootNode.id}/${subNode.id}`}
                    >
                      <span className="truncate">{subNode.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
    //   <!-- Sidebar nav ends -->
  );
};

//  <ul role="list" className="border-l border-transparent">
//                         {roots.map((rootNode) => (
//                             <li key={rootNode.id} className="relative">
//                                 <Link
//                                     aria-current="page"
//                                     className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
//                                     href={`/docs/${rootNode.id}`}
//                                 >
//                                     <span className="truncate">
//                                         {rootNode.title}
//                                     </span>
//                                 </Link>
//                                 {nonRoots[rootNode.id] && (
//                                     <ul
//                                         role="list"
//                                         className="border-l border-transparent"
//                                     >
//                                         {nonRoots[rootNode.id].map(
//                                             (subRoot) => (
//                                                 <li key={subRoot.id}>
//                                                     <Link
//                                                         className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
//                                                         href={`/docs/${rootNode.id}/${subRoot.id}`}
//                                                     >
//                                                         <span className="truncate">
//                                                             {subRoot.title}
//                                                         </span>
//                                                     </Link>
//                                                 </li>
//                                             )
//                                         )}
//                                     </ul>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>

export default SideBar;
