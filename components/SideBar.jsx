import { getDocument } from "@/lib/doc";
import Link from "next/link";

const SideBar = () => {
  const docs = getDocument();
  const roots = docs.filter((doc) => doc.parent === null);
  const childrenOfRoot = docs.filter((doc) => doc.parent);
  console.log(roots);
  console.log(childrenOfRoot);
  const grpByParent = childrenOfRoot.reduce((acc, items) => {
    const key = items.parent ?? items.id;
    // const grpArray = acc[key] || []

    // console.log('items',items)
    // console.log('acc',acc)
    //  console.log('accKey array :',grpArray)
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(items);
    return acc;
    // console.log('key is: ',key);
    // console.log('accKey array :',acc[key])
  }, {});
  console.log("grp", grpByParent);
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
            {grpByParent[rootNode.id] && (
              <ul role="list" className="border-l-4 pl-4 border-blue-500">
                {grpByParent[rootNode.id].map((subNode) => (
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
