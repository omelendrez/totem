SELECT item, SUM(qty) as qty
from(

	SELECT oi1.`ticket_text` as item, count(1) as qty
	FROM escng_totem.order_items as oi1
	WHERE oi1.id not in (select id from escng_totem.order_items as oi3 where LOCATE('C/',oi1.`ticket_text`) >0)
    -- AND oi1.order_id in (SELECT id from escng_totem.order where DATE_FORMAT(`created_at`, '%d/%m/%Y')='17/02/2020')
	GROUP BY `ticket_text`

union all

	SELECT SUBSTRING(SUBSTRING(oi2.`ticket_text`, LOCATE('C/',oi2.`ticket_text`)),3) as item, count(1) as qty
	FROM escng_totem.order_items as oi2
	WHERE oi2.id in (select id from escng_totem.order_items as oi4 where LOCATE('C/',`ticket_text`) >0)
    -- AND oi2.order_id in (SELECT id from escng_totem.order where DATE_FORMAT(`created_at`, '%d/%m/%Y')='17/02/2020')
    GROUP BY SUBSTRING(SUBSTRING(oi2.`ticket_text`, LOCATE('C/',oi2.`ticket_text`)),3)

union all

	SELECT LEFT(oi3.`ticket_text`, LOCATE('C/',oi3.`ticket_text`)-2) as item, count(1) as qty
	FROM escng_totem.order_items as oi3
	WHERE oi3.id in (select id from escng_totem.order_items as oi5 where LOCATE('C/',`ticket_text`) >0)
    -- AND oi3.order_id in (SELECT id from escng_totem.order where DATE_FORMAT(`created_at`, '%d/%m/%Y')='17/02/2020')
    GROUP BY LEFT(oi3.`ticket_text`, LOCATE('C/',oi3.`ticket_text`)-2)

) t
GROUP BY item
ORDER BY item;