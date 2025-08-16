import React, { useState, useEffect, useLayoutEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  startLoading,
} from "../../features/product/productSlice";
import { Spinner } from "react-bootstrap";

const LandingPage = () => {
  const dispatch = useDispatch();

  const { productList, loading, totalPageNum, currentPage } = useSelector(
    (state) => state.product
  );
  const [showVideo, setShowVideo] = useState(true);
  const [query] = useSearchParams();
  const name = query.get("name");
  const category = query.get("category");
  const page = parseInt(query.get("page")) || 1;

  useLayoutEffect(() => {
    dispatch(startLoading());
  }, [dispatch, name, category, page]);

  useEffect(() => {
    // Don't call API here - Navbar handles it
    // Just update video visibility based on filters
    if (!name && !category) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  }, [name, category]);

  const handlePageChange = (pageNumber) => {
    const newQuery = new URLSearchParams(query);
    newQuery.set("page", pageNumber);
    window.history.pushState(null, "", `?${newQuery.toString()}`);
    window.location.reload();
  };

  const renderPagination = () => {
    if (totalPageNum <= 1) return null;

    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPageNum, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
    );

    // First page
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Last page
    if (endPage < totalPageNum) {
      if (endPage < totalPageNum - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <Pagination.Item
          key={totalPageNum}
          onClick={() => handlePageChange(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() =>
          handlePageChange(Math.min(totalPageNum, currentPage + 1))
        }
        disabled={currentPage === totalPageNum}
      />
    );

    return (
      <div className="d-flex justify-content-center mt-4 mb-4">
        <Pagination>{items}</Pagination>
      </div>
    );
  };

  return (
    <div>
      {/* Full-screen video section */}
      {showVideo && (
        <div className="hero-video-section">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-fallback.jpg"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="/hero-video.webm" type="video/webm" />
            {/* Fallback content */}
            <div className="hero-fallback">
              <img
                src="/hero-fallback.jpg"
                alt="Hero background"
                className="hero-fallback-image"
              />
            </div>
          </video>
        </div>
      )}

      {/* Products section */}
      <Container>
        {/* Clear filters button */}
        {(name || category) && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              {name && (
                <span className="badge bg-primary me-2">검색어: {name}</span>
              )}
              {category && (
                <span className="badge bg-success me-2">
                  카테고리: {category}
                </span>
              )}
            </div>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                const newQuery = new URLSearchParams();
                newQuery.set("page", "1");
                window.history.pushState(null, "", `?${newQuery.toString()}`);
                window.location.reload();
              }}
            >
              필터 초기화
            </button>
          </div>
        )}

        <Row>
          {loading || productList == [] ? (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" />
            </div>
          ) : productList.length > 0 ? (
            <>
              {productList.map((item) => (
                <Col md={3} sm={12} key={item._id}>
                  <ProductCard item={item} />
                </Col>
              ))}
              {renderPagination()}
            </>
          ) : (
            <div className="text-align-center empty-bag">
              {!name && !category ? (
                <h2>등록된 상품이 없습니다!</h2>
              ) : (
                <h2>
                  {name && category
                    ? `${name}과 ${category} 카테고리에 일치한 상품이 없습니다!`
                    : name
                    ? `${name}과 일치한 상품이 없습니다!`
                    : `${category} 카테고리에 상품이 없습니다!`}
                </h2>
              )}
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
