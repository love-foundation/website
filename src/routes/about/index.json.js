import { fetchFile, fetchPageContent } from '../../_directus';


export async function get(req, res, next) {
  const pageContent = await fetchPageContent("test");
  const queriedContent = pageContent[0].has_content;

  queriedContent.map(async (content) => {
    let output;
    if (content.test_file) {
      let id = content.test_file;
      output = await fetchFile(id);
      content.test_file = output;
    }
  })

  setTimeout(() => {
    if (queriedContent !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify(
          queriedContent
        )
      );
    } else {
      next();
    }
  }, 1000);

}

