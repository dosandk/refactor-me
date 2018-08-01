/*
filterDataForTable (data) {
   const {positionsStatusFilter, investmentTypeFilter} = this.props;
   let filteredData = [];

   if (!positionsStatusFilter.length && !investmentTypeFilter.length) return data;

   if (positionsStatusFilter.length) {
     filteredData = R.map(item =>
       R.filter(R.propEq('changeType', item))(data), positionsStatusFilter);

     if (investmentTypeFilter.length) {
       filteredData = R.map(item =>
         R.filter(R.propEq('investmentTypeDesc', item))(filteredData[0]), investmentTypeFilter);
     }
   }

   if (investmentTypeFilter.length) {
     filteredData = R.map(item =>
       R.filter(R.propEq('investmentTypeDesc', item))(data), investmentTypeFilter);

     if (positionsStatusFilter.length) {
       filteredData = R.map(item =>
         R.filter(R.propEq('changeType', item))(filteredData[0]), positionsStatusFilter);
     }
   }

   return R.compose(
     R.unnest
   )(filteredData);
 }
*/

// TODO: refactoring
filterDataForTable (data) {
  const {positionsStatusFilter, investmentTypeFilter} = this.props;
  const getFilteredData = (data, type, filter) => R.map(item => R.filter(R.propEq(type, item))(data), filter);
  const getUnnest = arr => R.unnest(data);
  const statusFilterLength = positionsStatusFilter.length;
  const investmentFilterLength = investmentTypeFilter.length;

  if (investmentFilterLength && statusFilterLength) {
    const [head] = getFilteredData(data, 'investmentTypeDesc', investmentTypeFilter);
    return getUnnest(getFilteredData(head, 'changeType', positionsStatusFilter));
  } else {
    return data;
  }

  if (investmentFilterLength && !statusFilterLength) {
    return getUnnest(getFilteredData(data, 'investmentTypeDesc', investmentTypeFilter));
  }

  if (!investmentFilterLength && statusFilterLength) {
    return getUnnest(getFilteredData(data, 'changeType', positionsStatusFilter));
  }
}
