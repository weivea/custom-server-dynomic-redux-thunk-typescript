import { fetchAllData } from '../stores/book/fetch-sampledata';
function Page({ data }) {
  console.log(data);
  return <div>
    {JSON.stringify(data, null, 2)}
  </div>
}

// 另一个页面 也 声明了该方法的话，从另一个页面跳过来，会从后端加载并且预渲染；相当于重新加载页面；
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await fetchAllData();
  // const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

export default Page