import Image from 'next/image'

import { Feed } from '@/components';

export default function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover and Share
        <br className='max-md:hidden' />

        <span className='orange_gradient text-center'>AI-Powered Prompts</span>
      </h1>

      <p className='desc text-center'>
        Promptetheus is an open-source AI prompting tool for
        discovering, creating and sharing creative prompts
      </p>

      {/* Feed */}
      <Feed />

    </section>
  );
}
