import "dotenv/config";

import { graphDataTestRunner } from "~/utils/runner";
import { rssAgent, propertyFilterAgent, gloqAgent, stringTemplateAgent, copyAgent } from "@/experimental_agents";

const graph_data = {
  version: 0.2,
  nodes: {
    url: {
      value: "https://www.theverge.com/apple/rss/index.xml",
    },
    rssFeed: {
      agentId: "rssAgent",
      inputs: ["url"],
    },
    filter: {
      agentId: "propertyFilterAgent",
      params: {
        include: ["title", "link", "content"],
      },
      inputs: ["rssFeed.feed.entry.$0"], // "".$0" to avoid rate limit for now
    },
    map: {
      agentId: "mapAgent",
      inputs: ["filter"],
      isResult: true,
      graph: {
        version: 0.2,
        nodes: {
          template: {
            agentId: "stringTemplateAgent",
            params: {
              template: "Title:${0}\n${1}",
            },
            inputs: ["$0.title", "$0.content._"],
          },
          query: {
            agentId: "gloqAgent",
            params: {
              model: "Llama3-70b-8192", // "mixtral-8x7b-32768",
              query: "次のHTMLからテキストだけを抜き出し、省略せずに、全文を日本語に翻訳して。余計なことは言わずに、翻訳した文章だけ答えて。",
            },
            inputs: ["template"],
          },
          extractor: {
            agentId: "copyAgent",
            isResult: true,
            inputs: ["query.choices.$0.message.content"],
          },
        },
      },
    },
  },
};

const main = async () => {
  const result = (await graphDataTestRunner("sample_wiki.log", graph_data, {
    rssAgent,
    propertyFilterAgent,
    gloqAgent,
    stringTemplateAgent,
    copyAgent,
  })) as any;
  console.log(result.map.extractor);
};
if (process.argv[1] === __filename) {
  main();
}