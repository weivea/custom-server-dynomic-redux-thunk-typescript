import * as React from 'react';
import Link from 'next/link';
import Layout from '../pcomponents/Layout';
import { NextPage } from 'next';
import {Card, Button,Progress} from 'antd'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';


const IndexPage: NextPage = () => {
  return (
    <Layout title="Home" style={{width:300}}>
      <h1>Hello</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Card title="antd 组件" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <div>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} />
        </div>
        <p>Card content</p>
        <Button> 按钮 </Button>
      </Card>

      <Card title="Icons" bordered={false} style={{ width: 300 }}>
        <StarOutlined />
        <StarFilled />
        <StarTwoTone twoToneColor="#eb2f96" />
      </Card>
    </Layout>
  );
};

export default IndexPage;
