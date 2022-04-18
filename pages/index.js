import useSwr from 'swr'
import fetcher from '/helpers/fetcher'
import { ItemsPage } from '/components'

export default function Index() {
	const { data, error } = useSwr('/api/items', fetcher)

	if (error) return <div>Failed to load items [{JSON.stringify(error)}]</div>
	if (!data) return <div>Loading...</div>

	return <ItemsPage data={data} />
}
