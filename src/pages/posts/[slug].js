import { useRouter } from "next/router";
import { client } from "../../lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

const SanityImage = ({ asset }) => {
  const imageProps = useNextSanityImage(client, asset);

  if (!imageProps) return null;

  return (
    <Image
      {...imageProps}
      // layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};

const myPortableTextComponents = {
  types: {
    image: ({ value }) => <SanityImage {...value} />,
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

const Post = ({ post }) => {
  const router = useRouter();
  const { slug } = router.query;

  console.log(post);
  return (
    <div>
      <PortableText value={post.body} components={myPortableTextComponents} />
      {/* {posts && (
        <ul>
          {posts.map((post) => (
            <>
              <p>hello</p>
              <li key={post._id}>{post?.title}</li>
              <PortableText
                value={post.body}
                components={myPortableTextComponents}
              />
            </>
          ))}
        </ul>
      )} */}
      <p>Post: {slug}</p>
    </div>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const { slug } = params;

  console.log(slug);
  const post = await client.fetch(
    `*[_type == "post" && slug.current == "${slug}"][0]`
  );
  return {
    props: {
      post,
    },
  };
}

export const getStaticPaths = async () => {
  const slugs = await client.fetch(`*[_type == "post"]{ slug } `);
  const routes = slugs.map((slug) => `/posts/${slug.slug.current}`);

  //   console.log(routes);
  return {
    paths: routes || [],
    fallback: "blocking",
  };
};
