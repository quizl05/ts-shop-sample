import Filter from "../Filter/Filter"

export default function Products() {
    return (
        <section className="px-8 pt-9">
            <h2
            style={{
                fontSize: '3rem',
                color: 'gray'
            }}>Products</h2>
            <Filter jsonlink="/products.json" />
        </section>
    )
}