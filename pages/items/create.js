import { useRouter } from 'next/router'
import { ItemEditPage } from '/components'

// 192.168.1.74:3000/items/create?itemType=book

export default () => {
	const router = useRouter()
	return <ItemEditPage itemType={router.query.itemType}/>
}
