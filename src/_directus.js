import { Directus } from '@directus/sdk'

// Query all assets on staging/development, but only published on production

let status =
  process.env.NODE_ENV === 'production'
    ? ['published']
    : ['published', 'under_review', 'draft']
const directus = new Directus(process.env.DIRECTUS_URL)

const authDirectus = async () => {
  await directus.auth.static(process.env.DIRECTUS_TOKEN)
}

export async function fetchItems(
  collection = '',
  fields = '',
  filter = {},
  limit = -1
) {
  let filters = {
    ...filter,
    status: {
      _in: status,
    },
  }
  await authDirectus()
  try {
    let raw = await directus.items(collection).readMany({
      fields: fields,
      filter: filters,
      limit: limit,
    })
    const items = raw.data
    return items
  } catch (err) {
    console.log(err)
  }
}
