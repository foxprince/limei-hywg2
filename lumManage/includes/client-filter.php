<p style="margin:3px 10px 12px 10px; font-size:16px;">客户列表:</p>
<p style="margin:6px 10px;">
<span style="font-size:12px;">排序：</span><span id="recent-contact-btn" onClick="clientFilter('BYCONTACT')">联系日期</span>
<span id="recent-transaction-btn" onClick="clientFilter('BYTRANSACTION')">交易日期</span>
<span id="all-clients-btn" onClick="clientFilter('ALL')">全部</span>
</p>

<p style="margin:3px 10px;">
<input type="text" id="client-keyword" placeholder="关键词" /><button id="searchclient-btn" onClick="searchclient()">查找</button></p>
</p>


