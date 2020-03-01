import { fetchFile, fetchPageContent } from '../../_directus';


export async function get(req, res, next) {
  const pageContent = await fetchPageContent("test");
  const queriedContent = pageContent[0].content;

  // queriedContent.map(async (content) => {
  //   let output;
  //   console.log(content)
  //   if (content.image) {
  //     let id = content.image;
  //     output = await fetchFile(id);
  //     content.image = output;
  //   }
  // })

    if (queriedContent !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify(
          queriedContent.map(content => ({
            id: content.id,
            text: content.text,
            type: content.type,
            imageOne: content.image,
            imageTwo: content.image_two
          }))
        )
      );
    } else {
      next();
    }

}

