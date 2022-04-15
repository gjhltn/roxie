import useSwr from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSwr('/api/items', fetcher)
	
  if (error ) return <div>Failed to load items</div>
  if (!data ) return <div>Loading...</div>

  return (
 
    <ul>
      {data.items.map((item) => (
        <li key={item}>
          <Link href="/item/[id]" as={`/item/${item.id}`}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
