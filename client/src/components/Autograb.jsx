import React, { useRef, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Component() {
  const [text, setText] = useState('example');
  const [highlightedText, setHighlightedText] = useState('');

  const Module = /\d+ ((\w+ |-))*\(\d+ hours\)/g;
  const topic = /\d.(\d)/g;
  const topicName = /(?<=\b\d\s).*?(?=\s\d\b)/g;
  const duration = /\d\s?\n/g;

  const highlightCode = (code) => {
    
    let pass1 = code.replace(topicName, (match) => `<span style="color: blue;">${match}</span>`);
    let pass2 = pass1.replace(topic, (match) => `<span style="color: green;">${match}</span>`);
    let pass3 = pass2.replace(duration, (match) => `<span style="color: red;">${match}</span><br/>`);
    return pass3.replace(Module, (match) => `<span style="color: teal";">${match}</span><br/>`);
  };

  const contentEditableRef = useRef();
  const highlightedRef = useRef();

  const handleInputChange = () => {
    const codeSnippet = contentEditableRef.current.innerText;
    const highlightedCode = highlightCode(codeSnippet);
    setHighlightedText(highlightedCode);
    setText(contentEditableRef.current.innerText); // issue here #FIXME WHICH TEXT BOX TO TAKE
  };
  const handleScroll = () => {
    highlightedRef.current.scrollTop = contentEditableRef.current.scrollTop;
  };

  useEffect(() => {
    // Set initial content
    contentEditableRef.current.innerText = text;

    // Attach input event listener
    contentEditableRef.current.addEventListener("input", handleInputChange);
    contentEditableRef.current.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      contentEditableRef.current.removeEventListener("input", handleInputChange);
      contentEditableRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [text]);

  return (
    <div className="grid w-full  gap-4">
      {/* Your other components here */}
      <div className="flex items-center space-x-2 justify-around">
      <div className="grid w-[30px] h-[30px] place-items-center rounded-full  module-color">
        </div>
        <div>Module</div>
      <div className="grid w-[30px] h-[30px] place-items-center rounded-full moduleName-color">
        </div>
        <div>Module Name</div>
        <div className="grid w-[30px] h-[30px] place-items-center rounded-full  topicName-color">
        </div>
        <div>topics</div>
        <div className="grid w-[30px] h-[30px] place-items-center rounded-full duration-color">
        </div>
        <div>duration</div>
        <button size="sm">Upload file</button>
        <button size="sm" variant="outline">
          Download
        </button>
        <button size="sm">Clear</button>
        <button size="sm">Submit</button>
      </div>
      <div className="grid w-full gap-2 grid-cols-2 text-left font-semibold text-sm ">
        <div
          ref={contentEditableRef}
          placeholder="1 ModuleName
          1.1 topics 1..."
          className="rounded-t-lg h-60 overflow-y-scroll"
          contentEditable
          style={{
            border: "1px solid #ccc",
            minHeight: "100px",
            padding: "8px",
            outline: "none",
          }}
        />
        {/* Render the highlighted content */}
        <div ref={highlightedRef} dangerouslySetInnerHTML={{ __html: highlightedText }} className=" rounded-t-lg p-2 overflow-y-scroll h-60" style={{
            border: "1px solid #ccc",
            minHeight: "100px",
            padding: "8px",
            outline: "none",
          }}/>
      </div>
      <ModuleTable inputText={text}/>
    </div>
  );
}


const ModuleTable = ({inputText}) => {
    const [highlightedModules, setHighlightedModules] = useState([]);
  
    useEffect(() => {
      const Module = /\d+ ((\w+ |-))*\(\d+ hours\)/g;
      const topic = /\d.(\d)/g;
      const topicName = /(?<=\b\d\s).*?(?=\s\d\b)/g;
      const duration = /\d\s?\n/g;
  //#region  sample
    //   const inputText = `
    //   1 Linear Algebra (10 hours)
    //   1.1 Systems of linear equations, Solution by Gauss elimination 1
    //   1.2 Row echelon form, finding rank from row echelon form, fundamental theorem for linear systems 3
    //   1.3 Eigen values and eigen vectors 2
    //   1.4 Diagonaliztion of matrices, orthogonal transformation, quadratic forms and their canonical forms. 4
    //   2 Multivariable calculus Differentiation (8 hours)
    //   2.1 Concept of limit and continuity of functions of two variables, partial derivatives 2
    //   2.2 Differentials, Local Linear approximations 2
    //   2.3 Chain rule, total derivative 2
    //   2.4 Maxima and minima 2
    //   3 Multivariable calculus Integration (10 hours)
    //   3.1 Double integrals (Cartesian)-evaluation 2
    //   3.2 Change of order of integration in double integrals, change of coordinates 2
    //   3.3 Finding areas and volumes, mass and centre of gravity of plane laminas 3
    //   3.4 Triple integrals 3
    //   4 Sequences and series (8 hours)
    //   4.1 Convergence of sequences and series, geometric and p-series 2
    //   4.2 Test of convergence( comparison, ratio and root ) 4
    //   4.3 Alternating series and Leibnitz test, absolute and conditional convergence 2
    //   5 Series representation of functions (9 hours)
    //   5.1 Taylor series  Binomial series and series representation of exponential,trigonometric, logarithmic functions 2
    //   5.2 bengan 3
    //   `;
    //#endregion
  
      const modules = inputText.match(Module) || [];
      const topics = inputText.match(topic) || [];
      const topicNames = inputText.match(topicName) || [];
      const topicsfiltered = topicNames.filter(item => item.trim() !== "");
      const durations = inputText.match(duration) || [];
      console.log(modules,topics,topicNames)
      const highlightedModulesData = topics.map((value,index)=>{
        return(
            <tr key={index}>
                <td>{value}</td>
                <td>{topicsfiltered[index]}</td>
                <td>{durations[index]}</td>
            </tr>
        )
      })
  
      setHighlightedModules(highlightedModulesData);
    }, [inputText]);
  
    return (
      <div>
        <table className=" table">
          <thead>
            <tr>
              <th><b>Modules</b></th>
              <th><b>Topics</b></th>
              <th><b>duration</b></th>
            </tr>
          </thead>
          <tbody>
            {highlightedModules}
          </tbody>
        </table>
      </div>
    );
  };