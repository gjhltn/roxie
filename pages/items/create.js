import * as React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ItemEditPage } from '/components'
import fetcher from '/helpers/fetcher'

// 192.168.1.74:3000/items/create?itemType=book

export default () => {
	const router = useRouter()
	const { data, error } = useSWR(`/api/collections`, fetcher)

	if (error) return <div>Error [{JSON.stringify(error)}]</div>
	if (!data) return <div>Loading...</div>
	
	return (
		<ItemEditPage item={{ collections: data }} itemTypeName={router.query.itemType || 'book'} />
	)
}

export async function getServerSideProps(context) {
	return {
		props: {}
	}
}
