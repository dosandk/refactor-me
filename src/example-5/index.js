const mapStateToProps = (state, ownProps) => {
  const activeParams = R.propOr({}, 'activeParams', selectCustomParamsByKey(state, KEY));

  const {
    fundId,
    effectiveDate: asOfDate
  } = ownProps.params;

  const {
    returnType,
    benchmarkId
  } = activeParams;

  const primaryBenchmark = selectByKeyWithParams(state, KEY_PRIMARY_BENCHMARK, {fundId}) || {};
  const baseCurrency = selectBaseCurrency(state, asOfDate);
  const dependencyError = selectDependencyError(state, asOfDate);
  const benchmarks = selectByKeyWithParams(state, KEY_BENCHMARKS, {fundId}) || {};

  const formatedDate = formatDate(asOfDate);
  const params = {
    fundId,
    asOfDate: formatedDate,
    returnType,
    baseCurrency,
    dependencyError,
    benchmarks,
    activeParams,
    error: primaryBenchmark.error || benchmarks.error
  };

  // TODO: this needs refactoring
  if (benchmarkId !== '') {
    const data = selectByKeyWithParams(state, KEY, {fundId, benchmarkId, asOfDate: formatedDate, returnType}) || {};
    const inception = selectByKeyWithParams(state, KEY_INCEPTION_COLUMN, {fundId, benchmarkId, asOfDate: formatedDate, returnType}) || {};

    return {
      ...params,
      benchmarkId,
      data,
      inception
    };
  } else if (!primaryBenchmark.loading && primaryBenchmark.data) {
    const benchmarkId = R.prop('benchmarkId', R.head(primaryBenchmark.data));
    const data = selectByKeyWithParams(state, KEY, {fundId, benchmarkId, asOfDate: formatedDate, returnType}) || {};
    const inception = selectByKeyWithParams(state, KEY_INCEPTION_COLUMN, {fundId, benchmarkId, asOfDate: formatedDate, returnType}) || {};

    return {
      ...params,
      benchmarkId,
      data,
      inception,
      error: data.error
    };
  }

  return params;
};
