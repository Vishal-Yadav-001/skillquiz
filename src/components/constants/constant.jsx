import HtmlIcon from "../../assets/icons/html-5.png";
import JavaScriptIcon from "../../assets/icons/js.png";
import SqlIcon from "../../assets/icons/sql-server.png";
import DevOpsIcon from "../../assets/icons/devops.png";
 /**
  *  Topics of Quiz
  *  @type {Array.<Object>} 
  * */
const topics = [
    { id: 0, topic: "HTML", src: HtmlIcon },
    { id: 1, topic: "JavaScript", src: JavaScriptIcon },
    { id: 2, topic: "Sql", src: SqlIcon },
    { id: 3, topic: "DevOps", src: DevOpsIcon },
  ];
  /** 
   *  Levels of questions 
   * @type {Array.<Object>}
   * */
  const levels = [
    { id: 0, label: "Easy" },
    { id: 1, label: "Medium" },
    { id: 2, label: "Hard" },
  ];
   /** 
    *  No  of questions
    * @type {Array.<Object>}
    * */
  const limit = [
    { id: 0, range: 5 },
    { id: 1, range: 10 },
    { id: 2, range: 15 },
    { id: 3, range: 20 },
  ];

export { topics,levels,limit}