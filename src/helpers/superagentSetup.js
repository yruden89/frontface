import superAgentPrefix from "helpers/superAgentPrefix";
import superagent from "superagent";
import superagentErrorHook from "helpers/superagentErrorHook";

superAgentPrefix("//localhost:3000");
superagentErrorHook();

superagent.addHook(function (error, response) {
    alert(`Oooops! ${error.status} ${response.statusText}`);
});


export default superagent;
