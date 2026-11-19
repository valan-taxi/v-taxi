<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>V TAXI XML Sitemap | vtaxi.co.in</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background: #f8fafc;
            padding: 32px 20px 60px;
            line-height: 1.5;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #8e0303 0%, #b3160c 50%, #d32014 100%);
            border-radius: 16px;
            padding: 32px;
            color: #ffffff;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px -5px rgba(211, 32, 20, 0.25);
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
          }
          .brand-logo {
            background: #ffffff;
            color: #d32014;
            font-weight: 900;
            font-size: 20px;
            width: 38px;
            height: 38px;
            border-radius: 10px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .brand-name {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          .header h1 {
            font-size: 26px;
            font-weight: 800;
            margin: 12px 0 6px;
          }
          .header p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            max-width: 700px;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }
          .stat-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }
          .stat-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .stat-value {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
          }
          .table-header {
            padding: 18px 24px;
            border-bottom: 1px solid #e2e8f0;
            background: #ffffff;
          }
          .table-title {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
          }
          .table-desc {
            font-size: 12px;
            color: #64748b;
            margin-top: 2px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }
          th {
            background: #f1f5f9;
            color: #475569;
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 12px 20px;
            border-bottom: 1px solid #e2e8f0;
          }
          td {
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: #f8fafc;
          }
          .url-link {
            color: #b3160c;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          .url-link:hover {
            color: #d32014;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .badge-priority {
            background: #fee2e2;
            color: #991b1b;
          }
          .badge-freq {
            background: #e0f2fe;
            color: #0369a1;
          }
          .footer {
            margin-top: 24px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
          .footer a {
            color: #b3160c;
            text-decoration: none;
            font-weight: 600;
          }
          @media (max-width: 640px) {
            body { padding: 16px 12px 40px; }
            .header { padding: 20px; }
            th, td { padding: 10px 12px; }
            .hide-mobile { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">
              <span class="brand-logo">V</span>
              <span class="brand-name">V TAXI</span>
            </div>
            <h1>XML Sitemap</h1>
            <p>Official XML sitemap for <strong>vtaxi.co.in</strong>. Crawled and indexed by Google, Bing, and major search engines.</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Indexed Pages</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Canonical Domain</div>
              <div class="stat-value" style="font-size: 17px; line-height: 28px;">vtaxi.co.in</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Target Region</div>
              <div class="stat-value" style="font-size: 17px; line-height: 28px;">Tamil Nadu, IN</div>
            </div>
          </div>

          <div class="card">
            <div class="table-header">
              <div class="table-title">Live Public URLs</div>
              <div class="table-desc">All URLs listed below are verified and indexable by search engine bots.</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width: 50%;">URL</th>
                  <th style="width: 15%;">Priority</th>
                  <th style="width: 15%;" class="hide-mobile">Change Frequency</th>
                  <th style="width: 20%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a class="url-link" href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="badge badge-priority"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                    <td class="hide-mobile">
                      <span class="badge badge-freq"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td>
                      <span style="font-family: monospace; color: #475569; font-size: 12px;">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>© 2026 <strong>V TAXI</strong> • Central Booking Office, Tamil Nadu, India. Official Domain: <a href="https://vtaxi.co.in">vtaxi.co.in</a></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
