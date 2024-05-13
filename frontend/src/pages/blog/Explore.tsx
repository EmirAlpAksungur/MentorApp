import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import CreateBlog from "./CreateBlog";
import BlogBody from "../../layout/blog/details/BlogBody";
import BlogService from "../../services/api/blog";
import { BlogType } from "../../layout/blog/details/BlogBody";
import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  List,
} from "react-virtualized";
const Main: React.FC = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [blogList, setBlogList] = useState<BlogType[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [length, setLength] = useState<number>(1);
  const containerRef = useRef<HTMLElement>(null!);
  const fetchData = async () => {
    if (loading) return;
    try {
      setloading(true);
      let res = await BlogService.getBlogList(token, blogList.length / 10 + 1);

      setBlogList((prev: BlogType[]) => {
        return [...prev, ...res.data.data];
      });
      setLength(res.data.length);
      return Promise.resolve(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      setBlogList([]);
    };
  }, []);

  function isRowLoaded({ index }: { index: number }) {
    return !!blogList[index];
  }

  const rowRenderer = (props: any) => {
    return (
      <div key={props.key} style={props.style}>
        <BlogBody data={blogList[props?.index]} />
      </div>
    );
  };
  useEffect(() => {
    let element = document.getElementById("blog-container-scroll");

    if (element) {
      containerRef.current = element;
    }
  }, []);

  if (containerRef?.current)
    return (
      <Grid container key={"blog-explore"}>
        <AutoSizer disableHeight={true}>
          {({ width }) => (
            <WindowScroller scrollElement={containerRef?.current}>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <InfiniteLoader
                  isRowLoaded={isRowLoaded}
                  loadMoreRows={fetchData}
                  rowCount={length}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      autoHeight
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      height={height ? height : 0}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      rowCount={blogList?.length}
                      rowHeight={width < 800 ? 442.6 : 324.1}
                      rowRenderer={rowRenderer}
                      scrollTop={scrollTop}
                      width={width}
                      data={blogList}
                    />
                  )}
                </InfiniteLoader>
              )}
            </WindowScroller>
          )}
        </AutoSizer>
      </Grid>
    );
};

export default React.memo(Main);
